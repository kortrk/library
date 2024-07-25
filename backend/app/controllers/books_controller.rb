class BooksController < ApplicationController
  skip_before_action :authenticate_request
  before_action :authenticate_librarian_request, only: [:remove, :upsert]

  def index
    render :json => package_books_with_rating(Book.includes(:reviews).all)
  end

  def random
    render :json => Book.limit(params[:count]).order("RANDOM()")
  end

  def get_book
    render :json => Book.where(id: params[:id])
  end

  def search
    # could add pagination, but it's not needed yet
    search_str = "%" + ActiveRecord::Base.sanitize_sql(params[:query]) + "%"
    books = Book.includes(:reviews).where("title ILIKE ?", search_str)
    render :json => package_books_with_rating(books)
  end

  def upsert
    data = JSON.parse(request.raw_post)
    begin
      # Book.find_by_id(data[:id])
      Book.upsert(data, unique_by: :id)
      render :json => {success: true, msg: "Updated successfully"}
    rescue => e
      render :json => {success: false, msg: "Could not update"}
      raise e
    end
  end

  def remove
    begin
      b = Book.find_by_id(params[:id])
      title = b.title
      b.destroy!
      render :json => {success: true, msg: "Removed #{title} successfully"}
    rescue => e
      render :json => {success: false, msg: "Could not remove #{title}"}
    end
  end

  def check_out
    user = AuthorizeApiRequest.call(request.cookies).result

    if !user
      render :json => {success: false, msg: "Unauthorized"}
      return
    end

    book = Book.find_by_id(params[:id])

    if !book
      render :json => {success: false, msg: "No such book"}
      return
    end

    duedate = book.check_out!(user)
    render :json => {
      success: true,
      msg: "All set! #{book.title} will be due on #{duedate}."
    }
  end

  private

  def package_books_with_rating(books)
    books.map do |book|
      b = book.as_json
      ratings = book.reviews.pluck(:rating)
      b["avgRating"] = (ratings.count == 0) ? nil : avg(ratings)
      b
    end
  end

  def avg(nums)
    nums.sum / nums.size.to_f
  end
end

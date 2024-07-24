class BooksController < ApplicationController
  skip_before_action :authenticate_request

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

  def check_out
    user = AuthorizeApiRequest.call(request.cookies).result

    if !user
      render :json => {success: false, msg: "Unauthorized"}, status: 400
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
      b["avgRating"] = ratings.sum / ratings.size.to_f
      b
    end
  end
end

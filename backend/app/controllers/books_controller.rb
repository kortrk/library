class BooksController < ApplicationController
  skip_before_action :authenticate_request
  before_action :authenticate_librarian_request, only: [:check_in]

  def index
    render :json => Book.all
  end

  def random
    render :json => Book.limit(params[:count]).order("RANDOM()")
  end

  def get_book
    render :json => Book.where(id: params[:id])
  end

  def check_out
    user = AuthorizeApiRequest.call(request.cookies).result
    book = Book.find_by_id(params[:id])
    render :json => {success: false} if !user or !book
    duedate = book.check_out!(user)
    render :json => {success: true, msg: "#{book.title} will be due on #{duedate}"}
  end

  def check_in
    book = Book.find_by_id(params[:id])
    render :json => {success: false} if !book
    book.check_in!
    render :json => {success: true, msg: "#{book.title} returned successfully"}
  end
end

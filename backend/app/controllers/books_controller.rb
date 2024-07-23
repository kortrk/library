class BooksController < ApplicationController
  skip_before_action :authenticate_request

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
    render :json => {
      success: true,
      msg: "All set! #{book.title} will be due on #{duedate}."
    }
  end
end

class BooksController < ApplicationController
  skip_before_action :authenticate_request
  before_action :authenticate_librarian_request, only: [:random]

  def index
    render :json => Book.all
  end

  def random
    render :json => Book.limit(params[:count]).order("RANDOM()")
  end

  def get_book
    render :json => Book.where(id: params[:id])
  end

  def borrow
    render :json => {success: true}
  end
end

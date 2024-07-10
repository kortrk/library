class BooksController < ApplicationController
  def index
    render :json => Book.all
  end

  def random
    book_ids = Book.where(visible: true).pluck(:id).sample(params[:count].to_i)
    render :json => Book.where(id: book_ids)
  end
end

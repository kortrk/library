class BooksController < ApplicationController
  def index
    render :json => Book.all
  end

  def random
    render :json => Book.limit(params[:count]).order("RANDOM()")
  end
end

class BooksController < ApplicationController
  def index
    render :json => Book.all
  end

  def random
    render :json => Book.all.sample(params[:count].to_i)
  end
end

class ReviewsController < ApplicationController
  skip_before_action :authenticate_request

  def for_book_id
    render :json => Review.where(book_id: params[:bookId])
  end
end

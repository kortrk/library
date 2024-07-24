class ReviewsController < ApplicationController
  skip_before_action :authenticate_request

  def for_book_id
    render :json => Review.where(bookId: params[:bookId])
  end

  def create
    user = AuthorizeApiRequest.call(request.cookies).result

    if !user
      render :json => {
        success: false,
        msg: "Unauthorized"
      }, status: 400
      return
    end

    data = JSON.parse(request.raw_post)
    data["username"] = user.name # we won't trust the frontend to send this

    r = Review.new(data)
    if !r.valid?
      render json: { "success": false, "msg": r.errors.messages }
    else
      r.save!
      render json: {success: true,  msg: "Review added"}
    end
  end
end

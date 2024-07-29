class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session # https://stackoverflow.com/a/35184796
  before_action :authenticate_request
  attr_reader :current_user

  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.cookies).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end

  def authenticate_librarian_request
    @current_user = AuthorizeApiRequest.call(request.cookies).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user && @current_user.isLibrarian?
  end
end

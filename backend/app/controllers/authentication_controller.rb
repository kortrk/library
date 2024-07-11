class AuthenticationController < ApplicationController
  protect_from_forgery with: :null_session # won't need this if I restart with the api generator
  skip_before_action :authenticate_request

  def authenticate
    command = AuthenticateUser.call(params[:name], params[:password])

    if command.success?
      render json: { auth_token: command.result }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end
 end

# source: https://www.pluralsight.com/resources/blog/guides/token-based-authentication-with-ruby-on-rails-5-api

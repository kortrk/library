class AuthenticationController < ApplicationController
  protect_from_forgery with: :null_session # won't need this if I restart with the api generator
  skip_before_action :authenticate_request

  def signup
    puts "Here are the contents of params: #{params}"
    u = User.new(name: params[:name], password: params[:password], role: params[:role])
    if !u.valid?
      render json: { "success": false, "msg": u.errors.messages }
    else
      u.save!
      render json: { "success": true }
    end
  end

  def login
    command = AuthenticateUser.call(params[:name], params[:password])

    if command.success?
      render json: { auth_token: command.result }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end
 end

# source: https://www.pluralsight.com/resources/blog/guides/token-based-authentication-with-ruby-on-rails-5-api

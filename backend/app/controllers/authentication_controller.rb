class AuthenticationController < ApplicationController
  protect_from_forgery with: :null_session # https://stackoverflow.com/a/35184796
  # won't need this if I restart with the api generator

  skip_before_action :authenticate_request

  def signup
    u = User.new(name: params[:name], password: params[:password], role: params[:role])
    if !u.valid?
      render json: { "success": false, "msg": u.errors.messages }
    else
      u.save!
      render json: { "success": true }
    end
  end

  def login
    username, password = request.authorization.remove(/^Simple /).split(":")
    command = AuthenticateUser.call(username, password)

    if command.success?
      puts "LOGIN SUCCEEDED"

      cookies["auth"] = {value: command.result, same_site: "None", secure: false, httponly: true}

      render json: { success: true }
    else
      puts "LOGIN FAILED"
      render json: { success: false, msg: command.errors }, status: :unauthorized
    end
  end
 end

# source: https://www.pluralsight.com/resources/blog/guides/token-based-authentication-with-ruby-on-rails-5-api

class AuthenticationController < ApplicationController
  # protect_from_forgery with: :null_session # https://stackoverflow.com/a/35184796
  # won't need this if I restart with the api generator

  skip_before_action :authenticate_request
  skip_before_action :verify_authenticity_token

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
    command = AuthenticateUser.call(params[:name], params[:password])

    if command.success?
      puts "LOGIN SUCCEEDED"

      # response.set_header("Access-Control-Request-Credentials", true)
      # response.set_header("Access-Control-Allow-Origin", "*")
      # response.set_header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      # cookies[:auth] = {
      #   value: "X",
      #   httponly: true,
      #   # domain: ".localhost",
      #   path: "/",
      #   expires: 20.minutes.from_now
      #   # secure: Rails.application.config.secure_cookies,
      #   # same_site: "None"
      }
      render json: { success: true }
    else
      puts "LOGIN FAILED"
      render json: { success: false, msg: command.errors }, status: :unauthorized
    end
  end
 end

# source: https://www.pluralsight.com/resources/blog/guides/token-based-authentication-with-ruby-on-rails-5-api

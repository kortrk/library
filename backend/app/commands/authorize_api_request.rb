class AuthorizeApiRequest
  prepend SimpleCommand

  def initialize(cookies = {})
    @cookies = cookies
  end

  def call
    user
  end

  private

  attr_reader :cookies

  def user
    @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token
    @user || errors.add(:token, 'Invalid token') && nil
  end

  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(cookie_auth_token)
  end

  # def http_auth_header
  #   if headers['Authorization'].present?
  #     return headers['Authorization'].split(' ').last
  #   else
  #     errors.add(:token, 'Missing token')
  #   end
  #   nil
  # end

  def cookie_auth_token
    if @cookies['auth'].present?
      return @cookies['auth']
    else
      errors.add(:token, 'Missing token')
    end
    nil
  end
end

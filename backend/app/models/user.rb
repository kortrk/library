class User < ApplicationRecord
  has_secure_password
  has_many :books, foreign_key: :currentBorrower

  validates :name, uniqueness: true

  illegal_colon_msg = "  ':' is not an allowed character"
  validates :name,     format: { without: /:/, message: illegal_colon_msg }
  validates :password, format: { without: /:/, message: illegal_colon_msg }

  def isLibrarian?
    role == "librarian"
  end
end

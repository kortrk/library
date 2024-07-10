class User < ApplicationRecord
  has_secure_password
  has_many :books, foreign_key: :currentBorrower
  validates :name, uniqueness: true
end

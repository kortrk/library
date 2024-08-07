class Book < ApplicationRecord
  has_many :reviews, foreign_key: :bookId

  BORROWING_PERIOD = 5.days

  scope :currently_in, -> { where("\"currentBorrower\" is null") }

  def check_out!(user)
    return nil if self.currentBorrower != nil
    self.currentBorrower = user.id
    self.duedate = DateTime.now + BORROWING_PERIOD
    self.save!
    return duedate
  end
end

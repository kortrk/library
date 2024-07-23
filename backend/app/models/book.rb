class Book < ApplicationRecord
  has_many :reviews

  BORROWING_PERIOD = 10.days

  def check_out!(user)
    return nil if self.currentBorrower != nil
    self.currentBorrower = user.id
    self.duedate = DateTime.now + BORROWING_PERIOD
    self.save!
    return duedate
  end

  def check_in!
    self.currentBorrower = nil
    self.duedate = nil
    self.save!
  end
end

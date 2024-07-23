class Book < ApplicationRecord
  has_many :reviews

  def checkout!(user)
    self.currentBorrower = user.id
    self.duedate = DateTime.now + 10.days
    self.save!
    return duedate
  end
end

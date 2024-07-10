puts "seeding the db"

book_seeds = JSON.load_file("db/seeds/books.json")
book_seeds.each do |seed|
  Book.find_or_create_by!(seed)
end

reviewers = ["Eunice", "Lois", "Dorcas", "Phoebe", "Aquila", "Priscila", "Rhoda", "Timothy", "Titus", "Apollos", "Silas", "Barnabas", "Ananias", "Cornelius"]
ratings = [4, 5]
review_texts = ["Good", "Excellent", "Intriguing", "Interesting", "a fun read!", "cool", "Thought-provoking", "Nice", "Great read", "Recommended", "Amazing!!", "still really relevant today"]
book_seeds.count.times do |x|
  reviewer = reviewers.sample
  rating = ratings.sample
  review_text = review_texts.sample
  book_id = Book.all.sample.id
  Review.find_or_create_by!({rating: rating, text: review_text, book_id: book_id, username: reviewer})
end

u = User.new(name: "username", password: "password", role: "patron")
u.save!
b = Book.all.sample
b.currentBorrower = u.id
b.duedate = DateTime.now + 10.days
b.save!

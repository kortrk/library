book_seeds = JSON.load_file("db/seeds/books.json")
book_seeds.each do |seed|
  Book.find_or_create_by!(seed)
end

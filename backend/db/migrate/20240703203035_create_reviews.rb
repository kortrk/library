class CreateReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :reviews do |t|
      t.integer :rating
      t.text :text
      t.integer :bookId
      t.string :username

      t.timestamps
    end
  end
end

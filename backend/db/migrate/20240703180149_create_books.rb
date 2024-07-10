class CreateBooks < ActiveRecord::Migration[7.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.text :description
      t.string :publisher
      t.string :publicationDate
      t.string :category
      t.string :isbn
      t.integer :pageCount
      t.string :coverImage
      t.integer :currentBorrower
      t.date :duedate
      t.boolean :visible

      t.timestamps
    end
  end
end

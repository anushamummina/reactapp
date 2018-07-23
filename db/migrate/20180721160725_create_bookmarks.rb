class CreateBookmarks < ActiveRecord::Migration[5.2]
  def change
    create_table :bookmarks do |t|
      t.string :host
      t.string :url
      t.string :title
      t.integer :category_id

      t.timestamps
    end
  end
end

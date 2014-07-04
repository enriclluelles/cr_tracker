class CreateComics < ActiveRecord::Migration
  def change
    create_table :comics do |t|
      t.references :author, index: true
      t.string :title
      t.text :synopsis

      t.timestamps
    end
  end
end

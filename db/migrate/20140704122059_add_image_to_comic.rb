class AddImageToComic < ActiveRecord::Migration
  def change
    add_column :comics, :image_url, :string
  end
end

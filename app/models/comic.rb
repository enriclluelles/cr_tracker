class Comic < ActiveRecord::Base
  belongs_to :author

  validates_presence_of :author_id, :title
end

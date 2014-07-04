json.array! @authors do |author|
  json.partial! 'authors/author', author: author
end

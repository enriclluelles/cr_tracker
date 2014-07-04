json.array! @comics do |comic|
  json.partial! 'comics/comic', comic: comic
end

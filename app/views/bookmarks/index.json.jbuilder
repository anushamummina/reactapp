json.array! @bookmarks, partial: 'bookmarks/bookmark', as: :bookmark

json.(bookmark, :title, :host, :url)
json.category do
  json.extract! bookmark.category, :id, :name
end
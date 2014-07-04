Rails.application.routes.draw do
  scope :api do
    resources :comics
    resources :authors
    resources :images, only: [:create]
  end

  get '/(*path)', to: 'application#show'
end

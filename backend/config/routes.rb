# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users, only: %i[index show create update destroy]
  resources :cards, only: %i[create update destroy]
  resources :packs, only: %i[index show create update destroy]
  resources :views, only: %i[create]
  get "/categories", to: "packs#categories"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

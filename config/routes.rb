# frozen_string_literal: true

Rails.application.routes.draw do
  # TODO remove the routes that we do not need
  resources :users
  resources :views
  resources :cards
  resources :packs
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

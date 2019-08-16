# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users, only: [:show, :create, :update, :destroy]
  resources :cards, only: [:create, :update, :destroy]
  resources :packs, only: [:index, :show, :create, :update, :destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

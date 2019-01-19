Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resource :users, only: [:edit, :update, :destroy]
  resources :users, only: [:index, :edit, :update, :destroy]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end

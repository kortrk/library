Rails.application.routes.draw do
  defaults format: :json do
    get  '/auth/login', to: 'authentication#login'
    get  '/auth/logout', to: 'authentication#logout'
    post '/auth/signup', to: 'authentication#signup'
    get  '/books', to: 'books#index'
    get  '/books/:id', to: 'books#get_book'
    get  '/books/random/:count', to: 'books#random'
    get '/books/search/:query', to: 'books#search'
    post '/books/check_out/:id', to: 'books#check_out'
    post '/books/remove/:id', to: 'books#remove'
    get '/reviews/book/:bookId', to: 'reviews#for_book_id'
    put '/reviews/create', to: 'reviews#create'
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end

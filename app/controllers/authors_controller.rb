class AuthorsController < ApplicationController
  def create
    @author = Author.create(author_params)
    render action: :show
  end

  def index
    @authors = Author.all
  end

  def show
    @author = Author.find(params[:id])
  end

  def destroy
    @author = Author.find(params[:id])
    @author.destroy
  end

  def update
    @author = Author.find(params[:id])
    @author.update_attributes(author_params)
    render action: :show
  end

  private

  def author_params
    params.require(:author).permit(:name)
  end
end

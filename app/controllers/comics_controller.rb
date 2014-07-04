class ComicsController < ApplicationController
  def create
    @comic = Comic.create(comic_params)
    render action: :show
  end

  def index
    @comics = Comic.all
  end

  def show
    @comic = Comic.find(params[:id])
  end

  def destroy
    @comic = Comic.find(params[:id])
    @comic.destroy
  end

  def update
    @comic = Comic.find(params[:id])
    @comic.update_attributes(comic_params)
    render action: :show
  end

  private

  def comic_params
    params.require(:comic).permit(:title, :synopsis, :author_id, :image_url)
  end
end

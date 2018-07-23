class BookmarksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_bookmark, only: [:show, :edit, :update, :destroy]
  before_action :get_categories, only: [:index, :new,:edit]

  def index
    @bookmark = Bookmark.new
    @bookmarks = Bookmark.includes(:category).map { |bookmark| bookmark.as_json.merge({category: bookmark.category.try(:name)}) } 
  end

  def new
    @bookmark = Bookmark.new
  end

  def edit
  end

  def create
    @bookmark = Bookmark.new(bookmark_params)
    if @bookmark.save
      render json: @bookmark.as_json.merge({category: @bookmark.category.try(:name)}) 
    else
      render json: @bookmark.errors, status: :unprocessable_entity
    end
  end


  def update
    category = Category.where(:name => params[:bookmark][:category_id].capitalize).first
    params[:bookmark][:category_id] = category.id
    if @bookmark.update(bookmark_params)
      render json: @bookmark.as_json.merge({category: category.try(:name)}) 
    else
      render json: @bookmark.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bookmarks/1
  # DELETE /bookmarks/1.json
  def destroy
    @bookmark.destroy
    respond_to do |format|
      format.html { redirect_to bookmarks_url, notice: 'Bookmark was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bookmark
      @bookmark = Bookmark.find(params[:id])
    end

    def get_categories
      @categories = Category.all
    end
    # Never trust parameters from the scary internet, only allow the white list through.
    def bookmark_params
      params.require(:bookmark).permit(:host, :url, :title, :category_id)
    end
end

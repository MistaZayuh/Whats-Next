class Api::CommentsController < ApplicationController
  before_action :set_user
  before_action :set_event
  before_action :set_comment, only: [:update, :destroy]
  
  def index
    render json: @event.comments.all
  end

  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment
    else
      render json: comment.errors, status: 422
    end
  end

  def update
    if @comment.update(user_params)
      render json: @comment
    else
      render json: @comment.errors, status: 422
    end
  end

  def destroy
    @comment.destroy
  end

  private 
    def set_comment
      @comment = Comment.find(params[:id])
    end

    def set_user
      @user = User.find(params[:user_id])
    end

    def set_event
      @event = Event.find(params[:event_id])
    end

    def comment_params
      params.require(:comments).permit(:body)
    end
end

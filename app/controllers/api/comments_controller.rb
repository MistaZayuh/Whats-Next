class Api::CommentsController < ApplicationController
  before_action :set_event
  before_action :set_user, except: [:create]
  before_action :set_comment, only: [:update, :destroy]
  
  def index
    render json: @event.comments.all
  end

  def create
    comment = current_user.comments.new(comment_params)
    comment.event_id = @event.id
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
      params.require(:comment).permit(:body, :user_id, :event_id)
    end
end

class Api::EventsController < ApplicationController
  before_action :set_event, only: [:show, :update, :destroy, :split_date]
  def index
    render json: Event.all
  end

  def show
    render json: @event
  end

  def create
    event = Event.new(event_params)

    file = params[:file]

    if file
      begin
        # ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
        event.image = cloud_image['secure_url']
      # rescue => exception
      #   render json: {errors: exception}, status: 422
      end
    end

    if event.save
      render json: event
    else
      render json: event.errors, status: 422
    end
  end

  def update
    file = params[:file]

    if file
      begin
        # ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
        @event.image = cloud_image['secure_url']
      # rescue => e
      #   render json: {errors: e}, status: 422
      end
    end

    if @event.update(event_params)
      render json: @event
    else
      render json: @event.errors, status: 422
    end
  end

  def destroy
    @event.destroy
  end

  def specific_event_users 
    render json: Event.specific_event_users(params[:specificeventid])
  end

  def specific_event_comments
    render json: Event.specific_event_comments(params[:specificeventid])
  end

  def event_search
    render json: Event.event_search(params[:search])
  end

  def specific_event
    render json: Event.specific_event(params[:specificeventid])
  end

  def explore
    render json: Event.explore(params[:page])
  end

  private
    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.permit(:name, :description, :location, :date, :image, :open, :max_attendees)
    end
end

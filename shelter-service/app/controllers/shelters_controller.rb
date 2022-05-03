class SheltersController < ApplicationController
  # before_action :set_shelter, only: [:show, :update, :destroy]
  before_action :authorized, except: [:health,:show,:index]

  # GET /shelters
  def index
    @shelters = Shelter.all
    render json: @shelters
  end

  def health
    render true
  end

  def user_shelter
      
    shelter = ActiveRecord::Base.connection.execute("
      select s.*
      from user_shelters us
        inner join shelters s on s.id = us.shelter_id
      where us.user_id =  #{ActiveRecord::Base.sanitize_sql(@current_user_id.to_i)}
      limit 1 
    ")
    render json: shelter

  end

  # GET /shelters/1
  def show
    render json: Shelter.find(params[:id])
  end

  # POST /shelters
  def create
    @shelter = Shelter.new(shelter_params)

    if @shelter.save
      ActiveRecord::Base.connection.execute("
    insert into user_shelters(user_id,shelter_id) 
    values(#{ActiveRecord::Base.sanitize_sql(@current_user_id.to_i)},#{@shelter.id})
    ")
      render json: @shelter, status: :created, location: @shelter
    else
      render json: @shelter.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /shelters/1
  def update
    @shelter = Shelter.find(params[:id])
    if @shelter.present?
      if @shelter.update(shelter_params)
        render json: @shelter
      else
        render json: @shelter.errors, status: :unprocessable_entity
      end
    end
  end

  # DELETE /shelters/1
  def destroy


    @shelter = Shelter.find(params[:id])
    
    shelter_user = ActiveRecord::Base.connection.execute("
      select s.*
      from user_shelters us
        inner join shelters s on s.id = us.shelter_id and s.id =  #{ActiveRecord::Base.sanitize_sql(params[:id].to_i)}
      where us.user_id =  #{ActiveRecord::Base.sanitize_sql(@current_user_id.to_i)}
      limit 1 
    ")
    if shelter_user.length < 1
      render json: {message:"not shelter owner"}, status: :unauthorized
    end
    if @shelter.present?
      @shelter.destroy
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_shelter
      @shelter = Shelter.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def shelter_params
      params.require(:shelter).permit(:name, :description, :email, :phone_number, :address)
    end
end

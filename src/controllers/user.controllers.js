import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";



const genrateRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const refreshToken = user.genrateRefreshToken()

        return refreshToken;
    } catch (error) {
        throw new ApiError(500, "Something went Wrong")
    }
}


const userRegister = asyncHandler(async (req, res) => {
    const { mobile, name, password, confirmPassword } = req.body

    if (
        [mobile, name, password, confirmPassword].some((items) =>
            items.trim() === "")
    ) {
        throw new ApiError(400, "Required Fields")
    }

    console.log(name, mobile, password);


    if (password !== confirmPassword) {
        throw new ApiError(401, "Unauthorised Request")
    }

    const existedUser = await User.findOne({ name: name, mobile: mobile })

    if (existedUser) {
        throw new ApiError(409, "User Already Exists")
    }


    const user = await User.create({
        name,
        mobile,
        password
    })

    user.save();

    const createdUser = await User.findById(user._id)

    if (!createdUser) {
        throw new ApiError(500, "Internal Server Error")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "User Registered Successfully")
        )

})


const UserLogin = asyncHandler(async (req, res) => {

    const { mobile, password } = req.body

    if (mobile === '' || password === '') {
        throw new ApiError(400, 'Required Fields')
    }

    const user = await User.findOne({mobile:mobile})

    if (!user) {
        throw new ApiError(404,'User Does not Exists')
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(409,'Invalid Credentials')
    }

    const refreshToken = await genrateRefreshToken(user._id);

    return res
           .status(200)
           .json(
            new ApiResponse(200,refreshToken,'User Logged In Successfully')
           )

})

export {
    userRegister,
    UserLogin
}
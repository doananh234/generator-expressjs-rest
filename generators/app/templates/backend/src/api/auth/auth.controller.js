import httpStatus from 'http-status';
import { logger } from '../../services';
import Response from '../../helpers/response';
import authService from './auth.service';

export const signup = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await authService.signup(data);
    return Response.success(res, result, httpStatus.CREATED);
  } catch (exception) {
    next(exception);
  }
};

export const login = (req, res) => {
  const user = req.user;
  const result = authService.login(user);
  // return the information including token as JSON
  return Response.success(res, result, httpStatus.OK);
};

export const logout = async (req, res, next) => {
  try {
    const { token } = req.body;
    const result = await authService.logout(token);
    return Response.success(res, null, httpStatus.OK);
  } catch (exception) {
    next(exception);
  }
};

export const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.checkEmailIsValid(email);
    return Response.success(res, result, httpStatus.OK);
  } catch (exception) {
    next(exception);
  }
};

export const checkUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    const result = await authService.checkUsernameIsValid(username);
    return Response.success(res, result, httpStatus.OK);
  } catch (exception) {
    next(exception);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    await authService.forgotPassword(email);
    return Response.success(res);
  } catch (exception) {
    next(exception);
  }
};

export const verifyCode = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await authService.verifyCode(data);
    return Response.success(res, result);
  } catch (exception) {
    next(exception);
  }
};

export const resetPassword = async (req, res, next) => {
  const { newPassword } = req.body;
  const user = req.user;
  try {
    const result = await authService.resetPassword(user, newPassword);
    return Response.success(res, result);
  } catch (exception) {
    next(exception);
  }
};

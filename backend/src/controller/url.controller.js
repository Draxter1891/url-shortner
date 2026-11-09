import urlModel from "../model/url.model.js";
import { generateCode } from "../utils/url.utils.js";

export const createController = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Please enter a URL",
    });
  }

  if (
    url.startsWith("http://") === false &&
    url.startsWith("https://") === false
  ) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid URL starting with http:// or https://",
    });
  }

  if (url.length > 2048) {
    return res.status(400).json({
      success: false,
      message: "URL is too long",
    });
  }

  try {
    //generate a 6 character shorcode for url
    const code = generateCode();
    const newURL = await urlModel.create({
      originalUrl: url,
      shortCode: code,
    });

    res.status(201).json({
      success: true,
      message: "url shortened successfully",
      data: {
        originalUrl: newURL.originalUrl,
        shortCode: newURL.shortCode,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.errors,
    });
  }
};

export const getAllURLController = async (req, res) => {
  try {
    const urls = await urlModel.find();

    res.status(200).json({
      message: "URLs fetched successfully",
      data: {
        urls,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.errors,
    });
  }
};

/**
 *
 * @param {code} req.params
 * @returns
 */

export const redirectionController = async (req, res) => {
  try {
    const { code } = req.params;

    //If url code doesn't exists
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Please enter the shortened URL",
      });
    }

    //redirection logic
    const foundURL = await urlModel.findOne({
      shortCode: code,
    });

    if (!foundURL) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    res.redirect(302, foundURL.originalUrl);
    await urlModel.findOneAndUpdate(
      {
        shortCode: code,
      },
      {
        $inc: { clicks: 1 },
      },
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while redirecting",
    });
  }
};

export const deleteController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Please provide an ID for the url",
      });
    }

    const foundURL = await urlModel.findById(id);

    if (!foundURL) {
      return res.status(404).json({
        success: false,
        message: "URL not found with this ID",
      });
    }

    await urlModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "URL deleted successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.errors,
    });
  }
};

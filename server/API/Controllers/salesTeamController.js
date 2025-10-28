import SalesTeam from "../Models/SalesTeam.js";

export const getSalesTeam = async (req, res) => {
  try {
    const members = await SalesTeam.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    console.error("Get sales team error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching sales team"
    });
  }
};

export const getSalesTeamMember = async (req, res) => {
  try {
    const member = await SalesTeam.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found"
      });
    }

    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error("Get team member error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching team member"
    });
  }
};

export const createSalesTeamMember = async (req, res) => {
  try {
    const member = await SalesTeam.create(req.body);

    res.status(201).json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error("Create team member error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error while creating team member"
    });
  }
};

export const updateSalesTeamMember = async (req, res) => {
  try {
    let member = await SalesTeam.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found"
      });
    }

    member = await SalesTeam.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error("Update team member error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error while updating team member"
    });
  }
};

export const deleteSalesTeamMember = async (req, res) => {
  try {
    const member = await SalesTeam.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found"
      });
    }

    await SalesTeam.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully"
    });
  } catch (error) {
    console.error("Delete team member error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting team member"
    });
  }
};


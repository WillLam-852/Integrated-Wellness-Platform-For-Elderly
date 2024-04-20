//
//  OverlayView.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 13/4/2024.
//

import UIKit
import MediaPipeTasksVision

  /// A straight line.
struct Line {
  let from: CGPoint
  let to: CGPoint
}

/**
 This structure holds the display parameters for the overlay to be drawon on a pose landmarker object.
 */
struct PoseOverlay {
  let dots: [CGPoint]
  let lines: [Line]
}

  /// Custom view to visualize the pose landmarks result on top of the input image.
class OverlayView: UIView {
  
    /// Array to store pose overlays
  var poseOverlays: [PoseOverlay] = []
    /// Size of the content image/
  private var contentImageSize: CGSize = CGSize.zero
    /// Content mode of the image/
  var imageContentMode: UIView.ContentMode = .scaleAspectFit
    /// Orientation of the device/
  private var orientation = UIDeviceOrientation.portrait
    /// Offset from the edge/
  private var edgeOffset: CGFloat = 0.0
  
  
    // MARK: Public Functions
  
    // Function to draw pose overlays on the view
  func draw(
    poseOverlays: [PoseOverlay], // Array of pose overlays
    inBoundsOfContentImageOfSize imageSize: CGSize, // Size of the content image
    edgeOffset: CGFloat = 0.0, // Offset from the edge
    imageContentMode: UIView.ContentMode) { // Content mode of the image
      
        // Clear existing overlays
      self.clear()
        // Set the size of the content image
      self.contentImageSize = imageSize
        // Set the edge offset
      self.edgeOffset = edgeOffset
        // Set the pose overlays
      self.poseOverlays = poseOverlays
        // Set the content mode of the image
      self.imageContentMode = imageContentMode
        // Set the device orientation
      self.orientation = UIDevice.current.orientation
        // Trigger a redraw of the view
      self.setNeedsDisplay()
    }
  
  
    // Function to redraw pose overlays based on a new device orientation
  func redrawPoseOverlays(forNewDeviceOrientation deviceOrientation: UIDeviceOrientation) {
      // Set the new device orientation
    self.orientation = deviceOrientation
    switch orientation {
      case .portrait:
        fallthrough
      case .landscapeLeft:
        fallthrough
      case .landscapeRight:
          // Trigger a redraw of the view
        self.setNeedsDisplay()
      default:
        return
    }
  }
  
  
    // Function to clear all pose overlays from the view
  func clear() {
      // Clear the pose overlays
    poseOverlays = []
      // Reset the content image size
    contentImageSize = CGSize.zero
      // Reset the content mode of the image
    imageContentMode = .scaleAspectFit
      // Reset the device orientation
    orientation = UIDevice.current.orientation
      // Reset the edge offset
    edgeOffset = 0.0
      // Trigger a redraw of the view
    setNeedsDisplay()
  }
  
  
  override func draw(_ rect: CGRect) {
      // Iterate through each pose overlay
    for poseOverlay in poseOverlays {
        // Draw the lines of the pose overlay
      drawLines(poseOverlay.lines)
        // Draw the dots of the pose overlay
      drawDots(poseOverlay.dots)
    }
  }
  
  
    // MARK: Private Functions
  
    // Function to calculate the adjusted rectangle based on the view bounds and orientation
  private func rectAfterApplyingBoundsAdjustment(
    onOverlayBorderRect borderRect: CGRect) -> CGRect {
      
        // Get the current size of the view
      var currentSize = self.bounds.size
        // Get the minimum dimension of the view
      let minDimension = min(self.bounds.width, self.bounds.height)
        // Get the maximum dimension of the view
      let maxDimension = max(self.bounds.width, self.bounds.height)
      
      switch orientation {
        case .portrait:
            // Adjust size for portrait orientation
          currentSize = CGSize(width: minDimension, height: maxDimension)
        case .landscapeLeft:
          fallthrough
        case .landscapeRight:
            // Adjust size for landscape orientation
          currentSize = CGSize(width: maxDimension, height: minDimension)
        default:
          break
      }
      
      let offsetsAndScaleFactor = OverlayView.offsetsAndScaleFactor(
        // Use the content image size for calculation
        forImageOfSize: self.contentImageSize,
        // Use the current size of the view for calculation
        tobeDrawnInViewOfSize: currentSize,
        // Use the content mode of the image
        withContentMode: imageContentMode)
      
        // Apply scaling and translation to the border rectangle
      var newRect = borderRect
        .applying(
          CGAffineTransform(scaleX: offsetsAndScaleFactor.scaleFactor, y: offsetsAndScaleFactor.scaleFactor)
        )
        .applying(
          CGAffineTransform(translationX: offsetsAndScaleFactor.xOffset, y: offsetsAndScaleFactor.yOffset)
        )
      
        // Adjust the rectangle if it goes beyond the edge offset in the x-axis
      if newRect.origin.x < 0 &&
          newRect.origin.x + newRect.size.width > edgeOffset {
        newRect.size.width = newRect.maxX - edgeOffset
        newRect.origin.x = edgeOffset
      }
      
        // Adjust the rectangle if it goes beyond the edge offset in the y-axis
      if newRect.origin.y < 0 &&
          newRect.origin.y + newRect.size.height > edgeOffset {
        newRect.size.height += newRect.maxY - edgeOffset
        newRect.origin.y = edgeOffset
      }
      
        // Adjust the rectangle if it extends beyond the height of the view
      if newRect.maxY > currentSize.height {
        newRect.size.height = currentSize.height - newRect.origin.y - edgeOffset
      }
      
        // Adjust the rectangle if it extends beyond the width of the view
      if newRect.maxX > currentSize.width {
        newRect.size.width = currentSize.width - newRect.origin.x - edgeOffset
      }
      
        // Return the adjusted rectangle
      return newRect
    }
  
  
    // Function to draw dots on the view
  private func drawDots(_ dots: [CGPoint]) {
      // Iterate through each dot
    for dot in dots {
        // Create a rectangle for the dot
      let dotRect = CGRect(
        x: CGFloat(dot.x) - DefaultConstants.pointRadius / 2,
        y: CGFloat(dot.y) - DefaultConstants.pointRadius / 2,
        width: DefaultConstants.pointRadius,
        height: DefaultConstants.pointRadius)
        // Create a bezier path for the dot
      let path = UIBezierPath(ovalIn: dotRect)
        // Set the fill color for the dot
      DefaultConstants.pointFillColor.setFill()
        // Set the stroke color for the dot
      DefaultConstants.pointColor.setStroke()
        // Stroke the path
      path.stroke()
        // Fill the path
      path.fill()
    }
  }
  
  
    // Function to draw lines on the view
  private func drawLines(_ lines: [Line]) {
    let path = UIBezierPath()
      // Iterate through each line
    for line in lines {
        // Move to the starting point of the line
      path.move(to: line.from)
        // Add a line to the ending point of the line
      path.addLine(to: line.to)
    }
      // Set the line width
    path.lineWidth = DefaultConstants.lineWidth
      // Set the stroke color
    DefaultConstants.lineColor.setStroke()
      // Stroke the path
    path.stroke()
  }
  
  
    // MARK: Helper Functions
  
    // Helper function to calculate offsets and scale factor for image drawing
  static func offsetsAndScaleFactor(
    forImageOfSize imageSize: CGSize, // Size of the image
    tobeDrawnInViewOfSize viewSize: CGSize, // Size of the view
    withContentMode contentMode: UIView.ContentMode) // Content mode of the image
  -> (xOffset: CGFloat, yOffset: CGFloat, scaleFactor: Double) {
    
      // Calculate the width scale
    let widthScale = viewSize.width / imageSize.width
      // Calculate the height scale
    let heightScale = viewSize.height / imageSize.height
    
    var scaleFactor = 0.0
    
    switch contentMode {
      case .scaleAspectFill:
          // Use the maximum scale factor
        scaleFactor = max(widthScale, heightScale)
      case .scaleAspectFit:
          // Use the minimum scale factor
        scaleFactor = min(widthScale, heightScale)
      default:
          // Use a scale factor of 1.0 (no scaling)
        scaleFactor = 1.0
    }
    
      // Calculate the scaled size of the image
    let scaledSize = CGSize(
      width: imageSize.width * scaleFactor,
      height: imageSize.height * scaleFactor)
      // Calculate the x-offset
    let xOffset = (viewSize.width - scaledSize.width) / 2
      // Calculate the y-offset
    let yOffset = (viewSize.height - scaledSize.height) / 2
    
      // Return the offsets and scale factor
    return (xOffset, yOffset, scaleFactor)
  }
  
  
    // Helper to get object overlays from detections.
  static func poseOverlays(
    fromMultiplePoseLandmarks landmarks: [[NormalizedLandmark]], // Array of pose landmarks
    inferredOnImageOfSize originalImageSize: CGSize, // Size of the original image
    ovelayViewSize: CGSize, // Size of the overlay view
    imageContentMode: UIView.ContentMode, // Content mode of the image in the overlay view
    andOrientation orientation: UIImage.Orientation) -> [PoseOverlay] { // Orientation of the image
      
        // Array to store pose overlays
      var poseOverlays: [PoseOverlay] = []
      
        // Check if landmarks array is empty
      guard !landmarks.isEmpty else {
          // Return empty array if landmarks are empty
        return []
      }
      
        // Calculate offsets and scale factor for drawing
      let offsetsAndScaleFactor = OverlayView.offsetsAndScaleFactor(
        forImageOfSize: originalImageSize,
        tobeDrawnInViewOfSize: ovelayViewSize,
        withContentMode: imageContentMode)
      
        // Iterate through each set of pose landmarks
      for poseLandmarks in landmarks {
        var transformedPoseLandmarks: [CGPoint]!
        
          // Check the image orientation
        switch orientation {
          case .left:
              // Transform landmarks for left orientation
            transformedPoseLandmarks = poseLandmarks.map({CGPoint(x: CGFloat($0.y), y: 1 - CGFloat($0.x))})
          case .right:
              // Transform landmarks for right orientation
            transformedPoseLandmarks = poseLandmarks.map({CGPoint(x: 1 - CGFloat($0.y), y: CGFloat($0.x))})
          default:
              // Use original landmarks for default orientation
            transformedPoseLandmarks = poseLandmarks.map({CGPoint(x: CGFloat($0.x), y: CGFloat($0.y))})
        }
        
          // Calculate dot positions based on transformed landmarks, offsets, and scale factor
        let dots: [CGPoint] = transformedPoseLandmarks.map({CGPoint(x: CGFloat($0.x) * originalImageSize.width * offsetsAndScaleFactor.scaleFactor + offsetsAndScaleFactor.xOffset, y: CGFloat($0.y) * originalImageSize.height * offsetsAndScaleFactor.scaleFactor + offsetsAndScaleFactor.yOffset)})
        
        let lines: [Line] = PoseLandmarker.poseLandmarks
          // Iterate through pose connections
          .map({ connection in
              // Get start point of the line
            let start = dots[Int(connection.start)]
              // Get end point of the line
            let end = dots[Int(connection.end)]
              // Create a Line object with start and end points
            return Line(from: start, to: end)
          })
        
          // Create a PoseOverlay object with dots and lines, and add it to the poseOverlays array
        poseOverlays.append(PoseOverlay(dots: dots, lines: lines))
      }
      
        // Return the array of pose overlays
      return poseOverlays
    }
  
}

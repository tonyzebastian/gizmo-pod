import React, { useState, useCallback } from 'react'
import { Play, Pause, Camera, Mic, MicOff, Eye, EyeOff } from 'lucide-react'

export const CameraControls = ({ device, onUpdate }) => {
  const [localControls, setLocalControls] = useState(device?.cameraControls || {})

  // Validate required props and data
  if (!device?.cameraControls || !device?.cameraSpecs) {
    return null
  }

  const handleToggleRecording = useCallback(() => {
    const newState = { ...localControls, isRecording: !localControls.isRecording }
    setLocalControls(newState)
    onUpdate?.({ cameraControls: newState })
  }, [localControls, onUpdate])

  const handleToggleMotionDetection = useCallback(() => {
    const newState = { ...localControls, motionDetection: !localControls.motionDetection }
    setLocalControls(newState)
    onUpdate?.({ cameraControls: newState })
  }, [localControls, onUpdate])

  const handleToggleNightVision = useCallback(() => {
    const newState = { ...localControls, nightVision: !localControls.nightVision }
    setLocalControls(newState)
    onUpdate?.({ cameraControls: newState })
  }, [localControls, onUpdate])

  const handleToggleAudio = useCallback(() => {
    const newState = { ...localControls, audioRecording: !localControls.audioRecording }
    setLocalControls(newState)
    onUpdate?.({ cameraControls: newState })
  }, [localControls, onUpdate])

  const handleQualityChange = useCallback((quality) => {
    const newState = { ...localControls, quality }
    setLocalControls(newState)
    onUpdate?.({ cameraControls: newState })
  }, [localControls, onUpdate])

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'text-red-600 bg-red-50'
      case 'recording': return 'text-red-600 bg-red-50'
      case 'idle': return 'text-slate-600 bg-slate-50'
      default: return 'text-slate-600 bg-slate-50'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Camera Controls
        </h3>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(localControls.status)}`}>
          {localControls.status.toUpperCase()}
        </div>
      </div>

      {/* Recording Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Recording</span>
          <button
            onClick={handleToggleRecording}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              localControls.isRecording
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {localControls.isRecording ? (
              <>
                <Pause size={14} />
                <span className="text-xs font-medium">Stop</span>
              </>
            ) : (
              <>
                <Play size={14} />
                <span className="text-xs font-medium">Start</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Motion Detection</span>
          <button
            onClick={handleToggleMotionDetection}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              localControls.motionDetection ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                localControls.motionDetection ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {device.cameraSpecs.hasNightVision && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Night Vision</span>
            <button
              onClick={handleToggleNightVision}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                localControls.nightVision
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {localControls.nightVision ? (
                <Eye size={14} />
              ) : (
                <EyeOff size={14} />
              )}
              <span className="text-xs font-medium">
                {localControls.nightVision ? 'On' : 'Off'}
              </span>
            </button>
          </div>
        )}

        {device.cameraSpecs.hasAudio && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Audio Recording</span>
            <button
              onClick={handleToggleAudio}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                localControls.audioRecording
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {localControls.audioRecording ? (
                <Mic size={14} />
              ) : (
                <MicOff size={14} />
              )}
              <span className="text-xs font-medium">
                {localControls.audioRecording ? 'On' : 'Off'}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Video Quality */}
      <div className="space-y-2">
        <div className="text-sm text-slate-600">Video Quality</div>
        <div className="grid grid-cols-3 gap-2">
          {device.cameraSpecs.resolutions.map((resolution) => (
            <button
              key={resolution}
              onClick={() => handleQualityChange(resolution)}
              className={`py-2 px-3 text-xs font-medium rounded-lg transition-colors ${
                localControls.quality === resolution
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
              }`}
            >
              {resolution}
            </button>
          ))}
        </div>
      </div>

      {/* Camera Info */}
      <div className="space-y-2 pt-2 border-t border-slate-200">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Field of View</span>
          <span className="font-medium text-slate-900">
            {device.cameraSpecs.fieldOfView}°
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Current Quality</span>
          <span className="font-medium text-slate-900">
            {localControls.quality}
          </span>
        </div>
      </div>
    </div>
  )
}
Imports Microsoft.Phone.BackgroundAudio

''' <summary>
''' A background agent that performs per-track streaming for playback
''' </summary>
Public Class AudioTrackStreamer
    Inherits AudioStreamingAgent

    ''' <summary>
    ''' Called when a new track requires audio decoding
    ''' (typically because it is about to start playing)
    ''' </summary>
    ''' <param name="track">
    ''' The track that needs audio streaming
    ''' </param>
    ''' <param name="streamer">
    ''' The AudioStreamer object to which a MediaStreamSource should be
    ''' attached to commence playback
    ''' </param>
    ''' <remarks>
    ''' To invoke this method for a track set the Source parameter of the AudioTrack to null
    ''' before setting  into the Track property of the BackgroundAudioPlayer instance
    ''' property set to true
    ''' otherwise it is assumed that the system will perform all streaming
    ''' and decoding
    ''' </remarks>    
    Protected Overrides Sub OnBeginStreaming(track As Microsoft.Phone.BackgroundAudio.AudioTrack, streamer As Microsoft.Phone.BackgroundAudio.AudioStreamer)
        'TODO: Set the SetSource property of streamer to a MSS source
        NotifyComplete()
    End Sub
    ''' <summary>
    ''' Called when the agent request is getting cancelled
    ''' The call to base.OnCancel() is necessary to release the background streaming resources
    ''' </summary>
    Protected Overrides Sub OnCancel()
        MyBase.OnCancel()
    End Sub

End Class
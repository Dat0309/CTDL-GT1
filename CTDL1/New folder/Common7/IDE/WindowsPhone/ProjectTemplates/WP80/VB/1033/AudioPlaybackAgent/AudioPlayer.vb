Imports System
Imports System.Diagnostics
Imports System.Windows
Imports Microsoft.Phone.BackgroundAudio

Public Class AudioPlayer
    Inherits AudioPlayerAgent

    ''' <remarks>
    ''' AudioPlayer instances can share the same process.
    ''' Static fields can be used to share state between AudioPlayer instances
    ''' or to communicate with the Audio Streaming agent.
    ''' </remarks>
    Shared Sub New()

        ' Subscribe to the managed exception handler
        Deployment.Current.Dispatcher.BeginInvoke(
        Sub()
            AddHandler Application.Current.UnhandledException, AddressOf UnhandledException
        End Sub)

    End Sub

    ' Code to execute on Unhandled Exceptions
    Private Shared Sub UnhandledException(ByVal sender As Object, ByVal e As ApplicationUnhandledExceptionEventArgs)

        If Debugger.IsAttached Then
            ' An unhandled exception has occurred break into the debugger
            Debugger.Break()
        End If

    End Sub

    ''' <summary>
    ''' Called when the playstate changes, except for the Error state (see OnError)
    ''' </summary>
    ''' <param name="player">The BackgroundAudioPlayer</param>
    ''' <param name="track">The track playing at the time the playstate changed</param>
    ''' <param name="playState">The new playstate of the player</param>
    ''' <remarks>
    ''' Play State changes cannot be cancelled. They are raised even if the application
    ''' caused the state change itself, assuming the application has opted-in to the callback.
    '''
    ''' Notable playstate events:
    ''' (a) TrackEnded: invoked when the player has no current track. The agent can set the next track.
    ''' (b) TrackReady: an audio track has been set and it is now ready for playack.
    '''
    ''' Call NotifyComplete() only once, after the agent request has been completed, including async callbacks.
    ''' </remarks>
    Protected Overrides Sub OnPlayStateChanged(ByVal player As BackgroundAudioPlayer, ByVal track As AudioTrack, ByVal playState As PlayState)

        Select (playState)

            Case playState.TrackEnded
                player.Track = GetPreviousTrack()
            Case playState.TrackReady
                player.Play()
            Case playState.Shutdown
                ' TODO: Handle the shutdown state here (e.g. save state)
            Case playState.Unknown
            Case playState.Stopped
            Case playState.Paused
            Case playState.Playing
            Case playState.BufferingStarted
            Case playState.BufferingStopped
            Case playState.Rewinding
            Case playState.FastForwarding
        End Select

        NotifyComplete()

    End Sub

    ''' <summary>
    ''' Called when the user requests an action using application/system provided UI
    ''' </summary>
    ''' <param name="player">The BackgroundAudioPlayer</param>
    ''' <param name="track">The track playing at the time of the user action</param>
    ''' <param name="action">The action the user has requested</param>
    ''' <param name="param">The data associated with the requested action.
    ''' In the current version this parameter is only for use with the Seek action,
    ''' to indicate the requested position of an audio track</param>
    ''' <remarks>
    ''' User actions do not automatically make any changes in system state the agent is responsible
    ''' for carrying out the user actions if they are supported.
    '''
    ''' Call NotifyComplete() only once, after the agent request has been completed, including async callbacks.
    ''' </remarks>
    Protected Overrides Sub OnUserAction(ByVal player As BackgroundAudioPlayer, ByVal track As AudioTrack, ByVal action As UserAction, ByVal param As Object)

        Select (action)
            Case UserAction.Play
                If player.PlayerState <> PlayState.Playing Then
                    player.Play()
                End If
            Case UserAction.Stop
                player.Stop()
            Case UserAction.Pause
                player.Pause()
            Case UserAction.FastForward
                player.FastForward()
            Case UserAction.Rewind
                player.Rewind()
            Case UserAction.Seek
                player.Position = param
            Case UserAction.SkipNext
                player.Track = GetNextTrack()
            Case UserAction.SkipPrevious
                Dim previousTrack As AudioTrack = GetPreviousTrack()
                If previousTrack IsNot Nothing Then
                    player.Track = previousTrack
                End If
        End Select

        NotifyComplete()
    End Sub

    ''' <summary>
    ''' Implements the logic to get the next AudioTrack instance.
    ''' In a playlist, the source can be from a file, a web request, etc.
    ''' </summary>
    ''' <remarks>
    ''' The AudioTrack URI determines the source, which can be:
    ''' (a) Isolated-storage file (Relative URI, represents path in the isolated storage)
    ''' (b) HTTP URL (absolute URI)
    ''' (c) MediaStreamSource (null)
    ''' </remarks>
    ''' <returns>an instance of AudioTrack, or null if the playback is completed</returns>
    Private Function GetNextTrack() As AudioTrack

        ' TODO: add logic to get the next audio track

        Dim track As AudioTrack = Nothing

        ' specify the track

        Return track
    End Function

    ''' <summary>
    ''' Implements the logic to get the previous AudioTrack instance.
    ''' </summary>
    ''' <remarks>
    ''' The AudioTrack URI determines the source, which can be:
    ''' (a) Isolated-storage file (Relative URI, represents path in the isolated storage)
    ''' (b) HTTP URL (absolute URI)
    ''' (c) MediaStreamSource (null)
    ''' </remarks>
    ''' <returns>an instance of AudioTrack, or null if previous track is not allowed</returns>
    Private Function GetPreviousTrack() As AudioTrack

        ' TODO: add logic to get the previous audio track

        Dim track As AudioTrack = Nothing

        ' specify the track

        Return track
    End Function

    ''' <summary>
    ''' Called whenever there is an error with playback, such as an AudioTrack not downloading correctly
    ''' </summary>
    ''' <param name="player">The BackgroundAudioPlayer</param>
    ''' <param name="track">The track that had the error</param>
    ''' <param name="error">The error that occured</param>
    ''' <param name="isFatal">If true, playback cannot continue and playback of the track will stop</param>
    ''' <remarks>
    ''' This method is not guaranteed to be called in all cases. For example, if the background agent
    ''' itself has an unhandled exception, it won't get called back to handle its own errors.
    ''' </remarks>
    Protected Overrides Sub OnError(player As Microsoft.Phone.BackgroundAudio.BackgroundAudioPlayer, track As Microsoft.Phone.BackgroundAudio.AudioTrack, [error] As System.Exception, isFatal As Boolean)
        If isFatal Then
            Abort()
        Else
            NotifyComplete()
        End If
    End Sub

    ''' <summary>
    ''' Called when the agent request is getting cancelled
    ''' </summary>
    ''' <remarks>
    ''' Once the request is Cancelled, the agent gets 5 seconds to finish its work,
    ''' by calling NotifyComplete()/Abort().
    ''' </remarks>
    Protected Overrides Sub OnCancel()
    End Sub

End Class
package com.boilerreactnativeapplication.presentations.viewmodelfactories

import android.app.Application
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.boilerreactnativeapplication.data.plan.ExercisePlan
import com.boilerreactnativeapplication.presentations.viewmodels.PoseInspectorViewModel

class PoseInspectorViewModelFactory (
    private val application: Application,
    private val planList: List<ExercisePlan>
) : ViewModelProvider.Factory {
    /**
     * Create a new instance of the given class.
     * */
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(PoseInspectorViewModel::class.java)) {
            return PoseInspectorViewModel(application, planList) as T
        }
        throw IllegalArgumentException("Unknown viewmodel class when creating main VM.")
    }
}